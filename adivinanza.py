import random

def jugar_juego():
    numero_secreto = random.randint(1, 100)
    intentos = 0

    print("Brienvenido al juego de Adivinanzas")
    print("Piensa en un número entre 1 y 100. ¿Puedes adivinar cuál es?")

    while True:
        intento_usuario = int(input("Ingresa tu intento: "))
        intentos += 1

        if intento_usuario < numero_secreto:
            print("Demasiado bajo. ¡Intentalo de nuevo!")
        elif intento_usuario > numero_secreto:
            print("Demasiado alto. ¡Intentalo de nuevo!")
        else: 
            print("¡felicidades! ¡Has adivinado el número en {intentos} intentos!")
            break

if __name__ == "_ _main_ _":
    jugar_juego()