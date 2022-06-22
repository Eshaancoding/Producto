import {IonFab, IonFabButton, IonIcon} from '@ionic/react'
import { closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const CloseButton: React.FC = () => {
    const history = useHistory()
    function handleCloseButton () {
        history.push("/home") 
    }
    return (
        <IonFab vertical='top' horizontal='end'>
            <IonFabButton class="DeleteButton" onClick={handleCloseButton}>
                <IonIcon icon={closeOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
    )
}

export default CloseButton;