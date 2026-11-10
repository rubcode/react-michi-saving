import {
    PiHouseSimpleBold,
    PiAirplaneTiltBold,
    PiCarSimpleBold,
    PiLaptopBold,
    PiGraduationCapBold,
    PiGiftBold,
    PiShieldCheckBold,
} from 'react-icons/pi'

export const CATEGORIES = [
    { id: 'home', label: 'Casa', Icon: PiHouseSimpleBold },
    { id: 'trip', label: 'Viaje', Icon: PiAirplaneTiltBold },
    { id: 'car', label: 'Auto', Icon: PiCarSimpleBold },
    { id: 'tech', label: 'Tecnología', Icon: PiLaptopBold },
    { id: 'education', label: 'Educación', Icon: PiGraduationCapBold },
    { id: 'shopping', label: 'Compras', Icon: PiGiftBold },
    { id: 'emergency', label: 'Emergencia', Icon: PiShieldCheckBold },
]

export function getCategory(id) {
    return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0]
}
