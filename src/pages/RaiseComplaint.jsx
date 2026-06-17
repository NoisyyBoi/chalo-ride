import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import toast, {
Toaster
} from "react-hot-toast";

export default function RaiseComplaint() {

const [users,setUsers]=useState([]);

const [errors,setErrors]=useState({});

const currentUser=
JSON.parse(
localStorage.getItem("user")
);

const [formData,setFormData]=
useState({

title:"",

description:"",

reportedBy:
currentUser?._id || "",

against:"",

issueType:""

});

const complaintTypes=[

"Unsafe Driving",

"Repeated Ride Cancellation",

"Abusive Behaviour",

"Harassment",

"Inappropriate Language",

"Discrimination",

"Payment Fraud",

"Vehicle Condition",

"Fake Identity",

"Other"

];

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers=
async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/api/admin/users"
);

setUsers(

res.data.filter(
u=>
u._id !==
currentUser?._id
)

);

}

catch{

toast.error(
"Unable to load users"
);

}

};

const handleChange=
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});

setErrors({

...errors,

[e.target.name]:
""

});

};

const validate=()=>{

let temp={};

if(
!formData.title.trim()
){

temp.title=
"Enter complaint title";

}

if(
!formData.description.trim()
){

temp.description=
"Description required";

}

if(
!formData.against
){

temp.against=
"Select user";

}

if(
!formData.issueType
){

temp.issueType=
"Select complaint type";

}

setErrors(
temp
);

return Object.keys(
temp
).length===0;

};

const handleSubmit=
async(
e
)=>{

e.preventDefault();

if(
!validate()
){

toast.error(
"Please fill all fields"
);

return;

}

try{

await axios.post(

"http://localhost:5000/api/complaints/create",

formData

);

toast.success(
"Complaint submitted"
);

setFormData({

title:"",

description:"",

reportedBy:
currentUser?._id,

against:"",

issueType:""

});

}

catch{

toast.error(
"Submission failed"
);

}

};

return(

<>

<Navbar/>

<div
className="
min-h-screen

bg-gradient-to-br

from-[#f8f8ff]

via-[#ffffff]

to-[#eef2ff]

relative

overflow-hidden
"
>

<Toaster

position="top-right"

toastOptions={{

duration:3000,

style:{

fontSize:"12px",

borderRadius:"18px"

}

}}

/>

<div
className="
absolute

left-[-90px]

top-[180px]

w-[300px]

h-[300px]

bg-indigo-300/20

blur-3xl

rounded-full

animate-pulse
"
/>

<div
className="
absolute

right-[-90px]

bottom-[150px]

w-[250px]

h-[250px]

bg-purple-300/20

blur-3xl

rounded-full

animate-pulse
"
/>

<div
className="
max-w-[850px]

mx-auto

px-6

py-14
"
>

<div
className="
bg-white/90

backdrop-blur-xl

rounded-[36px]

border

border-indigo-100

p-10

shadow-[0_30px_80px_rgba(99,102,241,.10)]

hover:-translate-y-1

duration-700
"
>

<div className="text-center mb-10">

<div
className="
inline-flex

items-center

gap-3

bg-gradient-to-r

from-indigo-500

to-purple-500

px-8

py-4

rounded-[24px]

shadow-xl

text-white
"
>

<span>

⚠

</span>

<h1
className="
text-[14px]

font-black
"
>

RAISE A COMPLAINT

</h1>

</div>

<p
className="
text-[12px]

text-slate-500

mt-4
"
>

Help us improve rider safety.

</p>

</div>

<form
onSubmit={
handleSubmit
}
className="
space-y-6
"
>

<div>

<label
className="
text-[12px]

font-bold
"
>

Reported By

</label>

<input

disabled

value={
currentUser?.name ||
"Guest"
}

className="
w-full

mt-2

p-4

rounded-xl

bg-gray-100

text-[12px]
"
/>

</div>

<div>

<label
className="
text-[12px]

font-bold
"
>

Complaint Against

</label>

<select

name="against"

value={
formData.against
}

onChange={
handleChange
}

className="
w-full

mt-2

p-4

rounded-xl

border

text-[12px]
"
>

<option value="">

Select User

</option>

{

users.map(
u=>(

<option
key={
u._id
}
value={
u._id
}
>

{
u.name
}

</option>

)

)

}

</select>

<p className="text-red-500 text-[11px]">

{
errors.against
}

</p>

</div>

<div>

<label
className="
text-[12px]

font-bold
"
>

Issue Type

</label>

<select

name="issueType"

value={
formData.issueType
}

onChange={
handleChange
}

className="
w-full

mt-2

p-4

rounded-xl

border

text-[12px]
"
>

<option value="">

Select Issue

</option>

{

complaintTypes.map(
x=>(

<option
key={x}
>

{x}

</option>

)

)

}

</select>

<p className="text-red-500 text-[11px]">

{
errors.issueType
}

</p>

</div>

<div>

<input

name="title"

placeholder="Complaint Title"

value={
formData.title
}

onChange={
handleChange
}

className="
w-full

p-4

rounded-xl

border

text-[12px]
"
/>

<p className="text-red-500 text-[11px]">

{
errors.title
}

</p>

</div>

<div>

<textarea

rows="5"

name="description"

placeholder="Explain issue"

value={
formData.description
}

onChange={
handleChange
}

className="
w-full

rounded-xl

border

p-4

text-[12px]
"
/>

<p className="text-red-500 text-[11px]">

{
errors.description
}

</p>

</div>

<div
className="
bg-red-50

rounded-xl

p-5
"
>

<p
className="
text-[12px]

text-red-700
"
>

Critical complaints may lead to review and account action.

</p>

</div>

<button

type="submit"

className="
w-full

py-5

rounded-[24px]

bg-gradient-to-r

from-indigo-500

via-purple-500

to-pink-500

text-white

text-[12px]

font-black

hover:scale-[1.02]

duration-500

shadow-xl
"
>

Submit Complaint

</button>

</form>

</div>

</div>

</div>

<Footer/>

</>

);

}