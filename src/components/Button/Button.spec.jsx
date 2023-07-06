
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '.'
import userEvent from '@testing-library/user-event'

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

    it('should call function on button click', () =>{
        // jest gera uma função propria
        const fn = jest.fn()
        // criado um onclick e passamos a fn
        render(<Button text="Load more" onClick={fn}/>)
        const button = screen.getByRole('button', { name: /load more/i })

        // aciona click no botão atraves do fireEvent
        userEvent.click(button) // usar userEvent torna mais natural
        // fireEvent.click(button)
        // fireEvent.click(button)

        // verifica se a função foi chamada
        expect(fn).toHaveBeenCalled()
        // espera quantidade exata de chamadas através da função
        expect(fn).toHaveBeenCalledTimes(1)

    })

    it('should call function on button click', () =>{

        render(<Button text="Load more" disabled={true}/>)

        const button = screen.getByRole('button', { name: /load more/i })

        // checa se o botão está desativado
        expect(button).toBeDisabled()

    })

    it('should call function on button click', () =>{

        render(<Button text="Load more" disabled={false}/>)

        const button = screen.getByRole('button', { name: /load more/i })

        // checa se o botão está ativado
        expect(button).toBeEnabled()

    })

    /**
        para checar se ainda a testes a serem feitos podemos utilizar o comando:
        npm test -- --coverage
        ele irá verificar os locais que ainda faltam testes para serem executos
     */

})

