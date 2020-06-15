import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTimes,
    faPlus,
    faDivide,
    faMinus
} from '@fortawesome/free-solid-svg-icons'

export default function () {
    library.add(
        faTimes,
        faPlus,
        faDivide,
        faMinus
    );
}