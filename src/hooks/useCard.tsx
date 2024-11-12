import { useContext } from "react"
import { CardContext } from "../context/CardContext"

export const useCard = () => {
    const context = useContext(CardContext)
    if(!context) {
        throw new Error("useCard deve ser usado com o cardContext")
    }
    return context
}