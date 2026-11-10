import { useState, useContext } from 'react'
import styled from 'styled-components'
import Field from '../components/ui/Field'
import InputText from '../components/forms/input-text'
import Button from '../components/forms/button'
import AuthScreen from '../components/layout/AuthScreen'
import { AuthContext } from '../contexts/authContext'
import { ApiError } from '../utils/api'

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
`

const HintStyled = styled.p`
    color: var(--textSecondary);
    font-size: 0.8rem;
    text-align: center;
`

function CreateProfilePage() {
    const { createProfile } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const nextErrors = {}
        if (name.trim() === '') nextErrors.name = 'Cuéntanos cómo te llamas'
        if (pin !== '') {
            if (!/^\d{4}$/.test(pin)) nextErrors.pin = 'El PIN debe tener 4 dígitos'
            else if (pin !== confirmPin) nextErrors.confirmPin = 'Los PIN no coinciden'
        }
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setSubmitting(true)
        try {
            await createProfile(name.trim(), pin || null)
        } catch (error) {
            if (error instanceof ApiError && error.errors) {
                setErrors(error.errors)
            } else {
                setErrors({ name: 'No se pudo crear tu perfil. Intenta de nuevo.' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthScreen title="¡Hola! 😺" subtitle="Vamos a personalizar tu Michi Saving.">
            <FormStyled onSubmit={handleSubmit}>
                <Field label="¿Cómo te llamas?" htmlFor="profile-name" error={errors.name}>
                    <InputText
                        id="profile-name"
                        placeholder="Tu nombre"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Field>
                <Field label="Crea un PIN de 4 dígitos (opcional)" htmlFor="profile-pin" error={errors.pin}>
                    <InputText
                        id="profile-pin"
                        placeholder="••••"
                        inputMode="numeric"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    />
                </Field>
                {pin !== '' && (
                    <Field label="Confirma tu PIN" htmlFor="profile-pin-confirm" error={errors.confirmPin}>
                        <InputText
                            id="profile-pin-confirm"
                            placeholder="••••"
                            inputMode="numeric"
                            maxLength={4}
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                        />
                    </Field>
                )}
                <HintStyled>
                    El PIN es solo para que esta app se sienta tuya en este dispositivo; no protege tu información.
                </HintStyled>
                <Button type="submit" text={submitting ? 'Creando...' : 'Empezar a ahorrar'} disabled={submitting} />
            </FormStyled>
        </AuthScreen>
    )
}

export default CreateProfilePage
