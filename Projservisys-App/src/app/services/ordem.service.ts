import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrdemServico } from '../models/ordem-servico';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

  baseURL = environment.apiURL + 'api/OrdemServico';

  constructor(private http: HttpClient) {}

  public GetOrdemServico(): Observable<OrdemServico[]>{
    return this.http.get<OrdemServico[]>(this.baseURL).pipe(take(1));
  }

  public GetOrdemServicoByUsuario(idUsuario: number): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(`${this.baseURL}/usuario/${idUsuario}`).pipe(take(1));
  }

  public GetOrdemServicoById(id: number): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public PostOrdemServico(ordens: OrdemServico): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(this.baseURL, ordens).pipe(take(1));
  }

  public PatchOrdemServico(id: number, changes: Partial<OrdemServico>): Observable<any> {
    return this.http.patch(`${this.baseURL}/Aprovado/${id}`, changes).pipe(take(1));
  }

  public AprovarOrdem(id: number): Observable<OrdemServico> {
    return this.http.patch<OrdemServico>(`${this.baseURL}/Aprovado/${id}`, {}).pipe(take(1));
  }

  public RejeitarOrdem(id: number): Observable<OrdemServico> {
    return this.http.patch<OrdemServico>(`${this.baseURL}/Rejeitado/${id}`, {}).pipe(take(1));
  }

  public mudarStatus(id: number, novoStatus: string): Observable<OrdemServico> {
    return this.http.patch<OrdemServico>(`${this.baseURL}/MudarStatus/${id}`, { estadoOrdemServico: novoStatus }).pipe(take(1));
  }
}
