import {IonButton, IonInput, IonChip, IonCard, IonCardContent, IonBadge} from '@ionic/react';
import "./HabitCard.css"

function habitCard (key:number, habitName:string, habitDescription:string, totalHours:number, totalSessions:number, streaks:number, monday:boolean, tuesday:boolean, wednesday:boolean, thursday:boolean, friday:boolean, saturday:boolean, sunday:boolean) {

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
      <IonCardContent>
        <IonInput className="habitName" type='text' value={habitName} placeholder='Insert Habit Name here'></IonInput>
        <IonInput className="descriptionName" type='text' value={habitDescription} placeholder='Insert Habit Description here'></IonInput>
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