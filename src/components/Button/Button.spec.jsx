
import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('<Button />', () => {
    /*
        checagem se botão foi renderizado com texto
    */
    it('should rneder the button with the text', () =>{
        render(<Button text="Load more" />)
        expect.assertions(2)

        // consula o elementos pelo nome ou descrição acessivel, exemplo um rotulo do elemento
        const button = screen.getByRole('button', { name: /load more/i })
        // query - não levanta erro caso não encontre o elemento
        // pode buscar um elemnto na tela que talvez não tenha sido renderizado
        // sendo possivel checar depois 

        // get - usamos quando geralmente sabemos que o elemento foi renderizado
        // apenas get - um so elemento
        // getall - mais elementos

        // esperamos que o botão esteja no documento
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('class', 'button')
    })
})

