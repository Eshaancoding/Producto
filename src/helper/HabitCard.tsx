import {IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonIcon, IonChip, IonCard, IonCardContent, IonBadge, IonFabButton, useIonToast, useIonViewDidEnter} from '@ionic/react';
import { checkmarkOutline, closeOutline, cogOutline, createOutline } from 'ionicons/icons'
import "./HabitCard.css"
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';
import { useState } from 'react';
import { hoursToString } from './DateHelper.js'

function HabitCard (props:any) {
  const history = useHistory()
  const store = new Storage() 
  const [habitToast, dismissToast] = useIonToast() 
  store.create()
  
  function chip (value:number, innerText:string) {
    function displayToast () {
      var dateName = ""
      if (innerText === "Mon") dateName = "Monday"
      if (innerText === "Tue") dateName = "Tuesday"
      if (innerText === "Wed") dateName = "Wednesday"
      if (innerText === "Thur") dateName = "Thursday"
      if (innerText === "Fri") dateName = "Friday"
      if (innerText === "Sat") dateName = "Saturday"
      if (innerText === "Sun") dateName = "Sunday"
      habitToast({ 
        cssClass: "toast",
        buttons: [{text: 'hide', handler: () => dismissToast() }],
        message: "You spent " + hoursToString(value, true) + " on " + dateName,
      })
    }

    if (value > 0) {
      return (
        <IonChip color="success" onClick={displayToast}> {innerText} </IonChip>
      )
      
    } else {
      return (
        <IonChip onClick={displayToast}> {innerText} </IonChip>
      )
    }
  }

  async function editHabit () {
    await store.set("habitIdEdit", props.habitIndex)
    history.replace("/editHabit")
  }

  return (
    <IonCard id="Card" className={(props.isBadHabit ? "badHabit " : "") + (props.didToday ? "didToday" : "")}>
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
          <IonBadge class="badge hoursSpent"> {hoursToString(props.totalHours)} </IonBadge>
        : <IonBadge class="badge">Bad Habit</IonBadge>}
        <IonBadge class="badge sessions"> {props.totalSessions} {props.isBadHabit ? "times avoided" : "sessions"} </IonBadge>
        <IonBadge class="badge streak"> {props.streaks} days streak </IonBadge>
      </IonCardContent>
    </IonCard>
  ) 
}

export default HabitCard; 