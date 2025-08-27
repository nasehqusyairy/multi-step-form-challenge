import { useSelector } from "react-redux"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import type { RootState } from "@/store"

export const addons = [
    {
        title: 'Online service',
        description: 'Access to multiplayer games',
        price: 1
    },
    {
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: 2
    },
    {
        title: 'Customizable Profile',
        description: 'Custom theme on your profile',
        price: 2
    },
]

export default function AddonPicker() {
    const { addons: selectedAddons, plan: { isYearly } } = useSelector((state: RootState) => state.multiStepForm)
    return (
        <>
            {addons.map((el, i) => (
                <Label key={'addon-' + i} className="addon-item">
                    <div className="flex items-center gap-4">
                        <Checkbox name="addons" value={i} defaultChecked={selectedAddons.includes(i)} />
                        <div className="gap-2 grid">
                            <p className="font-medium text-blue-950">
                                {el.title}
                            </p>
                            <p className="font-light text-gray-500 text-sm">
                                {el.description}
                            </p>
                        </div>
                    </div>
                    <div className="font-light text-indigo-600">
                        +${el.price * (isYearly ? 10 : 1)}/{isYearly ? 'yr' : 'mo'}
                    </div>
                </Label>
            ))}
        </>
    )
}