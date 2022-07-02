import {IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonIcon, IonInput, IonChip, IonCard, IonCardContent, IonBadge, IonFabButton, IonButton} from '@ionic/react';
import { checkmarkOutline, closeOutline, cogOutline, createOutline } from 'ionicons/icons'
import "./HabitCard.css"
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

function roundtoHundredth (num:number) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

function HabitCard (props:any) {
  const history = useHistory()
  const store = new Storage() 
  store.create()
  
  function chip (green:boolean, innerText:string) {
    if (green) {
      return (
        <IonChip color="success"> {innerText} </IonChip>
      )
      
    } else {
      return (
        <IonChip> {innerText} </IonChip>
      )
    }
  }

  async function editHabit () {
    await store.set("habitIdEdit", props.habitIndex)
    history.replace("/editHabit")
  }

  return (
    <IonCard id="Card" className={props.isBadHabit ? "badHabit" : ""}>
      <IonCardHeader>
        <IonCardTitle>{props.habitName}</IonCardTitle>
        <IonCardSubtitle>{props.habitDescription}</IonCardSubtitle>
        <IonFab vertical='top' horizontal='end'>
          <IonFabButton id="edit" onClick={editHabit}>
            <IonIcon icon={cogOutline}></IonIcon>  
          </IonFabButton>  
          <IonFabButton id="check" onClick={() => {props.MarkAsCompleteCallback(props.habitIndex)}}>
            <IonIcon icon={checkmarkOutline}></IonIcon>  
          </IonFabButton>  
        </IonFab>
      </IonCardHeader>

      <IonCardContent>
        {chip(props.monday, "Mon")}
        {chip(props.tuesday, "Tue")}
        {chip(props.wednesday, "Wed")}
        {chip(props.thursday, "Thur")}
        {chip(props.friday, "Fri")}
        {chip(props.saturday, "Sat")}
        {chip(props.sunday, "Sun")}
      </IonCardContent>

      <IonCardContent id="badgeContent">
        {!props.isBadHabit ? 
          <IonBadge class="badge hoursSpent"> {roundtoHundredth(props.totalHours)} hours spent</IonBadge>
        : <IonBadge class="badge">Bad Habit</IonBadge>}
        <IonBadge class="badge sessions"> {props.totalSessions} {props.isBadHabit ? "times avoided" : "sessions"} </IonBadge>
        <IonBadge class="badge streak"> {props.streaks} days streak </IonBadge>
      </IonCardContent>
    </IonCard>
  ) 
}

export default HabitCard; 