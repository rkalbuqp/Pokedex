import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPokemons().subscribe({
      next: (response) => {
        this.pokemons = response.results;
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      },
    });
  }

  fetchPokemons(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(this.apiUrl);
  }
}
