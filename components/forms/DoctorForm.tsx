"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { DoctorFormValidation, PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerDoctor } from "@/lib/actions/doctor.actions";
import { FormFieldType } from "./PatientForm";
import { SpecialtyOptions } from "@/constants/index";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "../FileUploader";

const DoctorForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "",
      specialty: "Cardiology" as MedicalSpecialty, 
      identificationDocument: [] as File[]
    }
  });

  async function onSubmit(values: z.infer<typeof DoctorFormValidation>) {
    console.log("Form submitted with values:", values);
    setIsLoading(true);

    let formData;

    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
    

    formData = new FormData();
    formData.append('blobFile', blobFile);
    formData.append('fileName', values.identificationDocument[0].name);

    }

    try {
      const doctorData = {
        ...values,
        identificationDocument: formData,
      }


      // @ts-ignore
      const doctor = await registerDoctor(doctorData);

      if (doctor) {
        router.refresh(); 
        setTimeout(() => {
          window.location.reload(); 
        }, 500);
      }
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1"
      >

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name *"
            placeholder="John Doe"
            iconSrc="/assets/user.svg"
            iconAlt="user"
            />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="specialty"
          label="Specialty"
          placeholder="Select a specialty"
        >
          {SpecialtyOptions.map((type) => (
            <SelectItem className="cursor-pointer hover:bg-dark-300 hover:text-cyan-600" key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Doctor's image *"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Add Doctor</SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorForm;
