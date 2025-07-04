import { FaCalendarAlt, FaListAlt } from 'react-icons/fa'
const adminId = localStorage.getItem('adminId')

const navItems = [
    {
        label: 'Sidebar1',
        icon: FaCalendarAlt,
        path: `/home/${adminId}/appointment-form`
    },
    {
        label: 'Sidebar2',
        icon: FaListAlt,
        path: `/home/${adminId}/view-appointments`
    }
]

export default navItems