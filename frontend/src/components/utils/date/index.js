
export const formattedDateForPost = (createdAt)=>{
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const differenceInSeconds = Math.floor(currentDate - createdDate);
  const differenceInMinutes = Math.floor(differenceInSeconds/60);
  const differenceInHours = Math.floor(differenceInSeconds/3600);
  const differenceInDays = Math.floor(differenceInHours/24);

  if(differenceInDays>1){
    return createdDate.toLocaleDateString("en-US", {month : "short", day : "numeric"});
  }
  else if(differenceInHours==1){
    return "1d";
  }
  else if(differenceInHours>1){
    return `${differenceInHours}h`;
  }
  else if(differenceInMinutes>=1){
    return `${differenceInMinutes}m`
  }
  else{
    return "Just Now";
  }
}

export const formatMemberSinceDate = (createdAt) => {
	const date = new Date(createdAt);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `Joined ${month} ${year}`;
};