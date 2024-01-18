import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {

    const category = 'One Punch';

    test('debe de mostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });

        render( <GifGrid category= { category }  />);
        
        expect( screen.getByText( 'Cargando...')).toBeTruthy();
        expect( screen.getByText( category )).toBeTruthy();
        
    });

    test('debe de mostrar item cuando se cargan las imásgenes usando useFetchGifs', () => {

        const gifs = [
            {
                id: '123',
                title: 'Saitama',
                url: 'http://imagenes.com/saitama.jpg'
            },
            {
                id: '456',
                title: 'Drangon',
                url: 'http://imagenes.com/dragon.jpg'
            }
        ];

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        });

        render( <GifGrid category= { category }  />);

        expect( screen.getAllByRole('img').length).toBe(2);

    });
});