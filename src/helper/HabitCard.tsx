import {IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonIcon, IonInput, IonChip, IonCard, IonCardContent, IonBadge, IonFabButton, IonButton} from '@ionic/react';
import { closeOutline } from 'ionicons/icons'
import "./HabitCard.css"


function habitCard (key:number, habitName:string, habitDescription:string, totalHours:number, totalSessions:number, streaks:number, monday:boolean, tuesday:boolean, wednesday:boolean, thursday:boolean, friday:boolean, saturday:boolean, sunday:boolean, closeButtonCallback:Function, MarkAsCompleteCallback:Function) {

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

  return (
    <IonCard id="Card" key={key}>
      <IonCardHeader>
        <IonCardTitle>{habitName}</IonCardTitle>
        <IonCardSubtitle>{habitDescription}</IonCardSubtitle>
        <IonFab vertical='top' horizontal='end'>
          <IonFabButton class="DeleteButton" onClick={() => {closeButtonCallback(key)}}>
            <IonIcon icon={closeOutline}></IonIcon>  
          </IonFabButton>  
          <IonButton id="MarkAsComplete" onClick={() => {MarkAsCompleteCallback(key)}}> Mark As Complete </IonButton>
        </IonFab>
      </IonCardHeader>

      <IonCardContent>
        {chip(monday, "Mon")}
        {chip(tuesday, "Tue")}
        {chip(wednesday, "Wed")}
        {chip(thursday, "Thur")}
        {chip(friday, "Fri")}
        {chip(saturday, "Sat")}
        {chip(sunday, "Sun")}
      </IonCardContent>

      <IonCardContent id="badgeContent">
        <IonBadge class="badge hoursSpent"> {totalHours} hours spent</IonBadge>
        <IonBadge class="badge sessions"> {totalSessions} sessions </IonBadge>
        <IonBadge class="badge streak"> {streaks} days streak </IonBadge>
      </IonCardContent>
    </IonCard>
  ) 
}

export default habitCard; 