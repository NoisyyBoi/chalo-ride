import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {

const [form,setForm]=useState({

firstName:"",
lastName:"",
email:"",
subject:"",
message:""

});

const [errors,setErrors]=useState({});

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};

const validate=()=>{

let error={};

const nameRegex=
/^[A-Za-z ]+$/;

const emailRegex=
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!form.firstName.trim()){

error.firstName=
"Enter first name";

}
else if(
!nameRegex.test(
form.firstName
)
){

error.firstName=
"Only letters allowed";

}

if(!form.lastName.trim()){

error.lastName=
"Enter last name";

}
else if(
!nameRegex.test(
form.lastName
)
){

error.lastName=
"Only letters allowed";

}

if(!form.email){

error.email=
"Enter email";

}
else if(
!emailRegex.test(
form.email
)
){

error.email=
"Invalid email";

}

if(!form.subject){

error.subject=
"Enter subject";

}

if(!form.message){

error.message=
"Enter message";

}

setErrors(error);

return Object.keys(
error
).length===0;

};

const handleSubmit=()=>{

if(
validate()
){

alert(
"Message sent successfully"
);

setForm({

firstName:"",
lastName:"",
email:"",
subject:"",
message:""

});

setErrors({});

}

};

return(

<>

<Navbar/>

<div className="min-h-screen bg-gradient-to-b from-[#f7f8ff] to-[#fff8fb]">

<div className="max-w-7xl mx-auto px-8 py-14">

<div className="text-center mb-16">

<h1 className="text-[22px] font-extrabold">

Get in Touch

</h1>

<p className="text-slate-500 text-[14px]">

We'd love to hear from you.
Send us a message!

</p>

</div>

<div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10">

<div className="bg-white rounded-[36px] p-12 border">

<h2 className="text-xl font-bold mb-10">

Send Us a Message

</h2>

<div className="grid grid-cols-2 gap-5">

<div>

<input
name="firstName"
value={form.firstName}
onChange={handleChange}
placeholder="John"
className="w-full border rounded-2xl p-5"
/>

<p className="text-red-500 text-sm mt-1">

{errors.firstName}

</p>

</div>

<div>

<input
name="lastName"
value={form.lastName}
onChange={handleChange}
placeholder="Doe"
className="w-full border rounded-2xl p-5"
/>

<p className="text-red-500 text-sm mt-1">

{errors.lastName}

</p>

</div>

</div>

<div className="mt-5">

<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="you@college.edu"
className="w-full border rounded-2xl p-5"
/>

<p className="text-red-500 text-sm">

{errors.email}

</p>

</div>

<div className="mt-5">

<input
name="subject"
value={form.subject}
onChange={handleChange}
placeholder="Subject"
className="w-full border rounded-2xl p-5"
/>

<p className="text-red-500 text-sm">

{errors.subject}

</p>

</div>

<div className="mt-5">

<textarea
name="message"
value={form.message}
onChange={handleChange}
placeholder="Tell us how we can help..."
className="
w-full
h-[220px]
border
rounded-2xl
p-5
resize-none
"
/>

<p className="text-red-500 text-sm">

{errors.message}

</p>

</div>

<button
onClick={handleSubmit}
className="
w-full
mt-8
py-6
rounded-3xl
text-white
font-bold
bg-gradient-to-r
from-indigo-500
to-purple-500
"
>

Send Message

</button>

</div>

<div className="flex flex-col gap-8">

<div className="bg-white rounded-[36px] border p-10">

<h3 className="text-xl font-bold">

Contact Information

</h3>

<p className="mt-8">

✉ support@chaloride.com

</p>

<p className="mt-5">

📍 Bangalore,
Karnataka,
India

</p>

</div>

<div className="
rounded-[36px]
p-10
text-white
bg-gradient-to-r
from-indigo-500
to-purple-500
">

<h3 className="text-xl font-bold">

Follow Us

</h3>

<p className="mt-5">

Stay connected with us
for updates and
community stories.

</p>

</div>

<div className="bg-white rounded-[36px] border p-10">

<h3 className="text-xl font-bold">

Partnership Inquiries

</h3>

<p className="mt-5">

Interested in partnering
with ChaloRide?

</p>

<button className="mt-5 text-indigo-500">

Learn More →

</button>

</div>

</div>

</div>

</div>

<Footer/>

</div>

</>

);

}