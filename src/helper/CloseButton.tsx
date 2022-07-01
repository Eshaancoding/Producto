import {IonFab, IonFabButton, IonIcon} from '@ionic/react'
import { closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import "./CloseButton.css"

const CloseButton: React.FC = () => {
    const history = useHistory()
    function handleCloseButton () {
        history.replace("/home") 
    }
    return (
        <IonFab id="Fab">
            <IonFabButton size="small" id="Button" onClick={handleCloseButton}>
                <IonIcon icon={closeOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
    )
}

export default CloseButton;