import ArcadeIcon from '@/assets/images/icon-arcade.svg'
import AdvancedIcon from '@/assets/images/icon-advanced.svg'
import ProIcon from '@/assets/images/icon-pro.svg'
import { Switch } from '../ui/switch'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

export const plans = [
    {
        title: 'Arcade',
        icon: ArcadeIcon,
        price: 9
    },
    {
        title: 'Advanced',
        icon: AdvancedIcon,
        price: 12
    },
    {
        title: 'Pro',
        icon: ProIcon,
        price: 15
    },
]

export default function PlanSelector() {

    const { id: selectedPlanId, isYearly: selectedPeriod } = useSelector((state: RootState) => state.multiStepForm.plan)
    const [isYearly, setisYearly] = useState(selectedPeriod);

    return (
        <>
            <div className="lg:flex gap-4 mb-4">
                {plans.map((el, i) => (
                    <label key={'plan-item-' + i} className="plan-item">
                        <input type="radio" name="id" className="sr-only" value={i} defaultChecked={i === selectedPlanId} />
                        <img src={el.icon} alt={el.title + '-icon'} className="lg:mb-16 size-12" />
                        <div>
                            <p className='text-blue-950'>{el.title}</p>
                            <p className='text-gray-500'>${el.price * (isYearly ? 10 : 1)}/{isYearly ? 'yr' : 'mo'}</p>
                            {isYearly && <p className='font-light text-blue-950 text-sm'>2 months free</p>}
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 bg-blue-50 p-4 rounded-xl">
                <p className={isYearly ? 'text-gray-500' : 'text-blue-950'}>Monthly</p>
                <Switch name='period' checked={isYearly} onCheckedChange={() => setisYearly(!isYearly)} />
                <p className={isYearly ? 'text-blue-950' : 'text-gray-500'}>Yearly</p>
            </div>
        </>
    )
}