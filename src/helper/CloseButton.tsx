import {IonFab, IonFabButton, IonIcon} from '@ionic/react'
import { closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import "./CloseButton.css"

function CloseButton (props:any) {
    const history = useHistory()
    function handleCloseButton () {
        history.replace("/Home") 
    }
    return (
        <IonFab id="Fab">
            <IonFabButton size={props.small ? "small" : undefined} id="Button" onClick={handleCloseButton}>
                <IonIcon icon={closeOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
    )
}

export default CloseButton;