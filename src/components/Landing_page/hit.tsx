// import React from 'react';
// import { HiTranslate } from 'react-icons/hi';

// // Define the data type structure
// type Data = {
//   [key: string]: string[];
// };

// const data: Data = {
//   "For Admin": [
//     "Collaboration with Medical Experts & Organizations → Partner with healthcare professionals for medical guidance & support.",
//     "Automated Donor-Recipient Matching → Utilize AI to find the most suitable matches based on health parameters.",
//     "Real-Time Monitoring & Updates → Track donation processes and keep records updated.",
//     "Manage User Roles & Access → Ensure data integrity and access control.",
//     "Post-Donation Health Tracking → Monitor donors' well-being after donation.",
//   ],
//   "For Donors": [
//     "Register as a Donor → Fill out personal and health information securely.",
//     "AI Health Monitoring → Receive regular updates and health tracking reports.",
//     "Eligibility Assessment → Check your eligibility based on medical conditions.",
//   ],
//   "For Recipients": [
//     "Register as a Recipient → Provide necessary information and medical records.",
//     "Real-Time Match Notifications → Get instant alerts when a match is found.",
//     "Post-Transplant Care → Follow-up health tracking and guidance.",
//   ],
//   "For HospitalNGO": [
//     "Collaboration Platform → Connect with other hospitals and NGOs.",
//     "Organ Transport Tracking → Monitor transportation of donated organs.",
//   ],
//   "For BlogsWriting": [
//     "Share Your Story → Inspire others by sharing your experience.",
//     "Medical Insights & News → Stay updated with medical research and news.",
//   ],
// };

// const hit: React.FC = () => {
//   const roles = Object.keys(data);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen  text-white font-alata">
//       <dl className="flex flex-col items-center justify-center text-center">
//         {roles.map((role, roleIndex) => (
//           <div key={role} className="relative mb-4">
//             <dt className={`absolute text-[20vmin] opacity-0 animate-fadeIn delay-${roleIndex * 4.5}s`}>
//               {role}
//             </dt>
//             {data[role].map((description, descIndex) => (
//               <dd key={descIndex} className={`absolute top-1/2 transform -translate-y-1/2 text-[5vmin] opacity-0 animate-fadeIn delay-${roleIndex * 4.5 + descIndex * 2.5 + 2.5}s`}>
//                 {description}
//               </dd>
//             ))}
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// };

// export default hit;