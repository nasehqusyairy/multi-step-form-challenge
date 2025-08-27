import type { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { plans } from "./plan-selector"
import { addons } from "./addon-picker"
import { setSequence } from "@/reducers/multi-step-form"

export default function SummaryCard() {

    const dispatch = useDispatch()

    const { addons: selectedAddonIds, plan: { id: planId, isYearly } } = useSelector((state: RootState) => state.multiStepForm)
    const { title, price } = plans[planId]

    let total = price * (isYearly ? 10 : 1)

    return (
        <>
            <div className="bg-blue-50 mb-6 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="gap-2 grid">
                        <h3 className="font-medium text-blue-950">{title} ({isYearly ? 'Yearly' : 'Monthly'})</h3>
                        <button onClick={() => dispatch(setSequence(1))} type="button" className="text-gray-500 hover:text-indigo-600 text-left underline cursor-pointer">Change</button>
                    </div>
                    <p className="font-bold text-blue-950">${total}/{isYearly ? 'yr' : 'mo'}</p>
                </div>
                <hr className="my-4 border border-gray-500/50" />
                <div className="gap-4 grid">
                    {selectedAddonIds.map((id, i) => {
                        const price = addons[id].price * (isYearly ? 10 : 1)
                        total += price
                        return (
                            <div key={'selected-addon-' + i} className="flex justify-between font-light">
                                <p className="text-gray-500">{addons[id].title}</p>
                                <p className="text-blue-950">+${price}/{isYearly ? 'yr' : 'mo'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-between px-6">
                <p className="text-gray-500">Total (per {isYearly ? 'year' : 'month'})</p>
                <p className="font-bold text-indigo-600">${total}/{isYearly ? 'yr' : 'mo'}</p>
            </div>
        </>
    )
}