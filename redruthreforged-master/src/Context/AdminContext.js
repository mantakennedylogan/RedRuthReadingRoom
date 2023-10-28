import React, { createContext, useState } from "react";

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
    // Collections
    const [collections, setCollections] = useState([]);
    const [currentCollection, setCurrentCollection] = useState({
        collection_id: null,
        title: null
    });
    const updateCurrCollection = (collection_id, title) => {
        let collection = {
            collection_id: collection_id,
            title: title
        }
        setCurrentCollection(collection)
    }

    // Prompts
    const [promptID, setPromptID] = useState(-1);

    // Responses
    const [currentResponse, setCurrentResponse] = useState({
        file_id: null,
        prompt: null,
        name: null,
        email: null,
        phone_num: null,
        postal_code: null,
        title: null,
        remarks: null,
        timestamp: null,
        file_length: null,
    });
    const updateCurrResponse = (recordinginfo) => {
        setCurrentResponse(recordinginfo)
    }
    const clearCurrResponse = () => {
        setCurrentResponse({
            file_id: null,
            prompt: null,
            name: null,
            email: null,
            phone_num: null,
            postal_code: null,
            title: null,
            remarks: null,
            timestamp: null,
            file_length: null,
        })
    }
    // View
    const [currentView, setCurrentView] = useState('home')

    // Authentication. THIS SHOULD BE HANDLED IN COOKIES OR SOMETHING, AS WE LOSE AUTHENTICATION ON REFRESH!
    const [userID, setUserID] = useState(1);

    return (
        <AdminContext.Provider value={{
            collections, setCollections,
            currentCollection, setCurrentCollection,
            updateCurrCollection,
            promptID, setPromptID,
            currentResponse, setCurrentResponse,
            updateCurrResponse, clearCurrResponse,
            userID, setUserID,
            currentView, setCurrentView
        }}>

            {children}

        </AdminContext.Provider>
    )
}

export default AdminContext;