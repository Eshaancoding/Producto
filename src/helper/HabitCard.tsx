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

  function TimeDisplay (props:any) {
    function indv (time:string) {
      if (time == null) return "null"
      var split:any = time.split(":")
      var hours:number = parseInt(split[0])
      var minutes:number = parseInt(split[1])
      var AM_PM = "AM"
      var add_zero = ""
      if (hours > 12) {
        AM_PM = "PM"
        hours -= 12
      }
      if (hours === 12) {
        AM_PM = "PM"
      }
      if (minutes < 10) {
        add_zero = "0"
      }
      if (hours === 0) {
        hours = 12 
        AM_PM = "AM"
      }
      return hours.toString() + ":" + add_zero + minutes.toString() + " " + AM_PM
    }

    if (props.startTime == null || props.endTime == null) {
      return (<></>) 
    } else {
      return (
        <>
          ({indv(props.startTime)} to {indv(props.endTime)})
        </>
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
        <IonCardTitle>{props.habitName} <TimeDisplay startTime={props.startTime} endTime={props.endTime} /> </IonCardTitle>
        <IonCardSubtitle>
          {props.habitDescription} <br />
          Reflection every <span className='highlight'> {props.intervalRefl} </span> days.<br /> 
          {(props.HabitOften !== "" && props.SessionsProductive !== "") && <> <br /> Last habit reflection:<br /> 
          <span style={{color: "white"}}>{props.HabitOften} <br /> {props. SessionsProductive}</span> </>}
        </IonCardSubtitle>
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
      </IonCardContent>
    </IonCard>
  ) 
}

export default HabitCard; 