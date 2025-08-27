import { useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type PersonalInfoFormMessages = {
    name: string
    email: string
    phone: string
}

type PeronalInfoInput = {
    label: string
    name: keyof PersonalInfoFormMessages
    type?: string
    pattern?: string
    placeholder: string
}

const peronalInfoInputs: PeronalInfoInput[] = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'e.g. Stephen King'
    },
    {
        label: 'Email Address',
        name: 'email',
        type: 'email',
        placeholder: 'e.g. stephenking@lorem.com'
    },
    {
        label: 'Phone Number',
        name: 'phone',
        type: 'tel',
        pattern: '^\\+\\d{1,3}(?:\\s\\d{2,4})+$',
        placeholder: 'e.g. +1 234 567 890'
    },
]


export default function PersonalInfoForm() {

    const [messages, setMessages] = useState<PersonalInfoFormMessages>({ name: '', email: '', phone: '' });

    const handleOnInvalid = (e: FormEvent<HTMLInputElement>) => {
        const { name, validationMessage } = e.currentTarget
        setMessages({ ...messages, [name]: validationMessage })
    }

    const { personalInfo } = useSelector((state: RootState) => state.multiStepForm)

    return (
        <>
            {peronalInfoInputs.map(({ name, label, placeholder, type, pattern }, i) => (
                <div className="gap-2 grid mb-6" key={'personal-info-input-' + i}>
                    <div className="flex justify-between gap-4">
                        <Label htmlFor={name} className="font-normal text-blue-950 shrink-0">{label}</Label>
                        <small className="text-destructive">{messages[name]}</small>
                    </div>
                    <Input aria-invalid={messages[name] !== ''} {...{ name, placeholder, type, pattern, id: name }} defaultValue={personalInfo[name]} required onInvalid={handleOnInvalid} />
                </div>
            ))}
        </>
    )
}