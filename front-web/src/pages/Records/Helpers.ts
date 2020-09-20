import moment from 'moment';

export const formatDate = (Date: string) =>{
    return moment(Date).format('DD/MM/YYYY HH:mm')
}