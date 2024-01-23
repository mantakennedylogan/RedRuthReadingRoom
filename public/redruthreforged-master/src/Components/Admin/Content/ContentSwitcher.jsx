import React, { useContext } from 'react'
import AdminContext from '../../../Context/AdminContext'
import AdminHome from './AdminHome'
import AdminEdit from './AdminEdit'
import AdminInbox from './AdminInbox'
import AdminPublish from './AdminPublish'

// This component handles which view to return to the main admin page, determined by currentView context.

function ContentSwitcher() {
    const { currentView } = useContext(AdminContext)

    switch (currentView) {
        case 'home':
            return <AdminHome />;
        case 'edit':
            return <AdminEdit />;
        case 'inbox':
            return <AdminInbox />;
        case 'publish':
            return <AdminPublish />;
        default:
            return <AdminPublish />;
    }
}

export default ContentSwitcher