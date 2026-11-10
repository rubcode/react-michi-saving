import styled from 'styled-components'
import { useState, useContext } from 'react'
import Field from '../ui/Field'
import InputText from '../forms/input-text'
import Button from '../forms/button'
import { GoalsContext } from '../../contexts/goalsContext'
import { ApiError } from '../../utils/api'

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

function RegisterSavingForm({ goalId, onRegistered }) {
    const { addContribution } = useContext(GoalsContext)
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const parsed = parseFloat(amount)
        if (!(parsed > 0)) {
            setError('Ingresa un monto mayor a 0')
            return
        }
        setError('')
        setSubmitting(true)
        try {
            await addContribution(goalId, parsed)
            setAmount('')
            if (onRegistered) onRegistered(parsed)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'No se pudo registrar el ahorro. Intenta de nuevo.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Field label="Cantidad" htmlFor="saving-amount" error={error}>
                <InputText
                    id="saving-amount"
                    placeholder="$500"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Field>
            <Button type="submit" text={submitting ? 'Registrando...' : '+ Registrar ahorro'} disabled={submitting} />
        </FormStyled>
    )
}

export default RegisterSavingForm
