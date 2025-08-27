import { useDispatch, useSelector } from "react-redux"
import { Button } from "./components/ui/button"
import type { RootState } from "./store"
import type { FormEvent } from "react"
import { back, confirm, next, setAddons, setPersonalInfo, setPlan, type PersonalInfoField } from "./reducers/multi-step-form"
import PersonalInfoForm from "./components/forms/personal-info"
import SuccessAlert from "./components/seccess-alert"
import PlanSelector from "./components/forms/plan-selector"
import AddonPicker from "./components/forms/addon-picker"
import { getFormValues } from "./lib/form"
import SummaryCard from "./components/forms/summary-card"

const steps = [
  {
    title: 'Personal info',
    description: 'Please provide your name, email address, and phone number.',
    content: PersonalInfoForm,
    indicator: 'Your info'
  },
  {
    title: 'Select your plan',
    description: 'You have the option of monthly or yearly billing.',
    content: PlanSelector,
    indicator: 'Select plan'

  },
  {
    title: 'Pick add-ons',
    description: 'Add-ons help enhance your gaming experience.',
    content: AddonPicker,
    indicator: 'Add-ons'

  },
  {
    title: 'Finishing up',
    description: 'Double-check everything looks OK before confirming.',
    content: SummaryCard,
    indicator: 'Summary'

  },
]

function App() {

  const dispatch = useDispatch()
  const { sequence, isConfirmed } = useSelector((state: RootState) => state.multiStepForm)

  const step = steps[sequence]

  const handleOnConfirm = () => dispatch(confirm())

  const formHandlers: Function[] = [
    (formValues: PersonalInfoField) => dispatch(setPersonalInfo(formValues)),
    ({ id, period }: { id: string, period?: 'on' }) => dispatch(setPlan({ id: parseInt(id), isYearly: period !== undefined })),
    ({ addons }: { addons: string[] | string }) => dispatch(setAddons([...addons].map(el => parseInt(el))))
  ]

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    formHandlers[sequence](getFormValues(new FormData(e.currentTarget)))

    dispatch(next())
  }

  return (
    <div id="multi-step-form">
      <main className="lg:flex items-center bg-blue-100 min-h-screen">
        <div className="mobile-indicator" />

        <div className="card">
          <div className="desktop-indicator">
            <ul className="indicator-list">
              {steps.map((el, i) => (
                <li key={'indicator-' + i} className="flex items-center gap-4">
                  <div className={"indicator-item" + (sequence === i ? " active" : "")}>{i + 1}</div>
                  <div className="hidden lg:block text-blue-50">
                    <p className="opacity-50 font-light text-sm">STEP {i + 1}</p>
                    <p className="font-medium uppercase">{el.indicator}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {isConfirmed ? <SuccessAlert /> : (
            <form onSubmit={handleOnSubmit} className="flex flex-col flex-auto justify-between lg:px-12 lg:pt-12">
              <div className="py-4">
                <h1 className="mb-2 font-bold text-blue-950 text-2xl">{step.title}</h1>
                <p className="mb-6 text-gray-500">{step.description}</p>
                <step.content />
              </div>

              <div className="footer">
                {sequence === 3
                  ? <Button onClick={handleOnConfirm} type="button" size={"lg"} className="bg-indigo-600 hover:bg-indigo-600/90">Confirm</Button>
                  : <Button size={"lg"} className="bg-blue-950 hover:bg-blue-950/90">Next Step</Button>
                }

                {sequence > 0 && <Button onClick={() => dispatch(back())} size={"lg"} variant={"ghost"} type="button">Go Back</Button>}
              </div>
            </form>
          )}
        </div>

      </main>
    </div>
  )
}

export default App
