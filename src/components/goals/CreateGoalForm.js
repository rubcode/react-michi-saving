import styled from 'styled-components'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Field from '../ui/Field'
import InputText from '../forms/input-text'
import CategoryPicker from './CategoryPicker'
import Button from '../forms/button'
import { GoalsContext } from '../../contexts/goalsContext'
import { CATEGORIES } from '../../constants/categories'
import { ApiError } from '../../utils/api'

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

function CreateGoalForm() {
    const navigate = useNavigate()
    const { createGoal } = useContext(GoalsContext)
    const [name, setName] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [category, setCategory] = useState(CATEGORIES[0].id)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const nextErrors = {}
        if (name.trim() === '') nextErrors.name = 'Ingresa un nombre para tu meta'
        if (!(parseFloat(targetAmount) > 0)) nextErrors.targetAmount = 'Ingresa un monto mayor a 0'
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setSubmitting(true)
        try {
            const id = await createGoal({
                name: name.trim(),
                category,
                targetAmount: parseFloat(targetAmount),
                targetDate,
            })
            navigate(`/goals/${id}`)
        } catch (error) {
            if (error instanceof ApiError && error.errors) {
                setErrors(error.errors)
            } else {
                setErrors({ name: 'No se pudo crear la meta. Intenta de nuevo.' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field label="Nombre" htmlFor="goal-name" error={errors.name}>
                <InputText
                    id="goal-name"
                    placeholder="Viaje a Japón"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Field>
            <Field label="¿Cuánto necesitas ahorrar?" htmlFor="goal-amount" error={errors.targetAmount}>
                <InputText
                    id="goal-amount"
                    placeholder="$30,000"
                    inputMode="decimal"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                />
            </Field>
            <Field label="¿Cuándo quieres lograrlo? (opcional)" htmlFor="goal-date">
                <InputText
                    id="goal-date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
            </Field>
            <Field label="Categoría">
                <CategoryPicker value={category} onChange={setCategory} />
            </Field>
            <Button type="submit" text={submitting ? 'Creando...' : 'Crear meta'} disabled={submitting} />
        </FormStyled>
    )
}

export default CreateGoalForm
