
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"

function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const login = localStorage.getItem("login")

 
async function Postenquiry(data) {

    if (login === "yes") {

        let apilink = await fetch("http://localhost:5000/enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (apilink.ok) {
            toast.success("Form submitted")
            reset()
        } else {
            toast.error("Try again")
        }

    } else {
        toast.error("Login to send enquiry")
    }
}


    function formhandle(data) {
        Postenquiry(data)
    }

    return (
        <>
            <Toaster />

            <form onSubmit={handleSubmit(formhandle)}>

                <label>Enquiry Form</label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    className="name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 5,
                            message: "Please enter valid name"
                        }
                    })}
                />

                <p className="inputalert">
                    {errors.name?.message}
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="email"
                    {...register("email", {
                        required: "Email is required"
                    })}
                />

                <p className="inputalert">
                    {errors.email?.message}
                </p>

                <input
                    type="text"
                    placeholder="Enter your Enquiry"
                    className="enquirymessage"
                    {...register("message", {
                        required: "Enquiry is required",
                        minLength: {
                            value: 5,
                            message: "Please enter a valid enquiry"
                        }
                    })}
                />

                <p className="inputalert">
                    {errors.message?.message}
                </p>

                <button type="submit">Submit</button>

            </form>
        </>
    )
}

export { Form }
