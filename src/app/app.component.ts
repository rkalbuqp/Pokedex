import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  imageUrl: string;
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
        // Para cada Pokémon, extrair o ID e construir a URL da imagem
        this.pokemons = response.results.map((pokemon) => {
          const id = this.extractIdFromUrl(pokemon.url);
          return {
            ...pokemon,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      },
    });
  }

  fetchPokemons(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(this.apiUrl);
  }

  // Função para extrair o ID do Pokémon a partir da URL
  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2]; // O penúltimo item na URL é o ID
  }
}
