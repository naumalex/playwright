export const getAge = function (/*DOBYear: number, DOBMonth: number, DOBDay: number*/DOB: string) {
    const today = new Date();
    
    //const birthDate = new Date(DOBYear, DOBMonth - 1, DOBDay);
    const birthDate = new Date(Date.parse(DOB));
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if ((today.getDate() - birthDate.getDate()) < 0) {
        month--;
    }
    return `${age}y ${Math.abs(month)}m`;
}