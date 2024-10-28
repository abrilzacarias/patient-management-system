"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/ui/button"
import {Form, FormControl} from "@/components/ui/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"
 
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",

    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof userFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        phone
      };

      const newUser = await createUser(userData);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`) }

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>

        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control} 
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/user.svg"
        iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
                  fieldType={FormFieldType.INPUT}
                  control={form.control} 
                  name="email"
                  label='Email'
                  placeholder="johndoe@example.com"
                  iconSrc="/assets/email.svg"
                  iconAlt="email"
                  />

          <CustomFormField 
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control} 
                  name="phone"
                  label='Phone Number'
                  placeholder="555-555-5555"
                 />

        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control} 
                  name="birthDate"
                  label='Date of Birth'
                  />

          <CustomFormField 
                  fieldType={FormFieldType.SKELETON}
                  control={form.control} 
                  name="gender"
                  label='Gender'
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue="field.value"
                      >
                        {GenderOptions.map((option) => (
                          <div key={option}
                          className="radio-group">
                            <RadioGroupItem
                            value={option}
                            id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                 />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          
        </div>
    
        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
