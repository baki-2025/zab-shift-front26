import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const SendParcel = () => {
  const { register, 
      handleSubmit,
           control, 
    //formState: { errors } 
  } = useForm();

  const {user} = useAuth()


  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const serviceCenters = useLoaderData();
  // const regionsDuplicate = serviceCenters.map(c => c.region);
  // const regions = [...new Set(regionsDuplicate)]

  // Unique regions
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  // 1.Watch the selected sender region
//   const senderRegion = watch('senderRegion');
//   const receiverRegion = watch('receiverRegion');
  //2.explore useMemo useCallback 
  const senderRegion = useWatch({ control, name: 'senderRegion'});
  const receiverRegion = useWatch({ control, name: 'receiverRegion'});

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  const handleSendParcel = data => {
    console.log(data);
  const isDocument = data.parcelType === 'document' 
  const isSameDistrict = data.senderDistrict === data.receiverDistrict;
  const parcelWeight = parseFloat(data.parcelWeight);
  let cost = 0;
  if(isDocument){
    cost = isSameDistrict ? 60 : 80;
 }
 else {
      if(parcelWeight < 3 ){
         cost = isSameDistrict ? 110 : 150;               
      }
      else{
          const minCharge = isSameDistrict ? 110: 150;
          const extraWeight = parcelWeight - 3;
          const extraCharge = isSameDistrict ? extraWeight * 40  :
          extraWeight * 40 + 40 ;
          cost = minCharge + extraCharge ;
      }
  }
  console.log('cost',cost);
  data.cost = cost;

  Swal.fire({
  title: "Agree with the cost?",
  text: `You will be charged ${cost} taka!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Confirm and continue payment!"
}).then((result) => {
  if (result.isConfirmed) {

    //save the parcel info to the database
    axiosSecure.post('/parcels', data)
    .then( res =>{
      console.log('after saving parcel',res.data);
      if(res.data.insertedId){
        navigate('/dashboard/my-parcels')
          Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Parcel has created. Please Pay",
  showConfirmButton: false,
  timer: 2000
});
      }
    })

   
  }
});
};

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4'>

                      {/* Parcel Type */}
                            <div>
          <label className="label mr-4">
            <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
            Document
          </label>
          <label className="label">
            <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
            Non-Document
          </label>
        </div>

                       {/* Parcel Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
          </fieldset>
        </div>
          
                       {/* Sender Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
        <fieldset className="fieldset">
          <h4 className="text-2xl font-bold">Sender Details</h4>
                          {/* Sender Name */}
          <label className="label">Sender Name</label>
          <input type="text" {...register('senderName')}defaultValue={user.displayName} className="input w-full" placeholder="Sender Name" />
                         {/* Sender Email   */}
          <label className="label">Sender Email</label>
          <input type="email" {...register('senderEmail')} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />
                          {/* Sender Region  */}
          <label className="label mt-4">Sender Regions</label>
          <select {...register('senderRegion')} className="select">
            <option value="">Pick a region</option>
            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>
                          {/* Sender District */}
          <label className="label mt-4">Sender Districts</label>
          <select {...register('senderDistrict')} className="select">
            <option value="">Pick a district</option>
            {districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
            {/* Sender Address */}
          <label className="label mt-4">Sender Address</label>
          <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                         
        </fieldset>

                  {/* Receiver Details */}
               <fieldset className="fieldset ">
          <h4 className="text-2xl font-bold">Receiver Details</h4>
          
                        {/* Receiver Name */}
          <label className="label">Receiver Name</label>
          <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                         {/* Receiver Email */}
          <label className="label">Receiver Email</label>
          <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />
                        
                        {/* Receiver Region */}
          <label className="label mt-4">Receiver Regions</label>
          <select {...register('receiverRegion')} className="select">
            <option value="">Pick a region</option>
            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>
                         {/* Receiver District */}
          <label className="label mt-4">Receiver Districts</label>
          <select {...register('receiverDistrict')} className="select">
            <option value="">Pick a district</option>
            {districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          {/* Receiver Address */}
          <label className="label mt-4">Receiver Address</label>
          <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
        </fieldset>
        </div>
        <input type="submit" className='btn btn-primary text-black mt-6' value="Send Parcel" />
      </form>
    </div>
    
  );
};

export default SendParcel;
