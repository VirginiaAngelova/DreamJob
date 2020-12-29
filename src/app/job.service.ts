import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jobOffer} from './jobs.interface';


@Injectable({
    providedIn: 'root'  
  })
  
export class jobService {

    url = 'http://localhost:3000/jobOffer';

    constructor(private http: HttpClient){}

    getJob(): Observable<jobOffer[]>{
        return this.http.get<jobOffer[]>(this.url)
    };
    getJobId(id: number): Observable<jobOffer> {
        const url = `${this.url}/${id}`;
    
        return this.http.get<jobOffer>(url);
      }
    createJob(jobOffer: jobOffer): Observable<jobOffer>{
        console.log(jobOffer);
        return this.http.post<jobOffer>(this.url,jobOffer);
    }
    updateJob(jobOffer: jobOffer) : Observable<any>{
        const url = `${this.url}/${jobOffer.id}`;
        return this.http.put(url,jobOffer);
    }
    deleteJob(id: number) : Observable<any>{
        const url = `${this.url}/${id}`;
        return this.http.delete(url);
    }
  
}