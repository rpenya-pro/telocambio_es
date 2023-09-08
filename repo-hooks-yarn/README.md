# Telocambio Hooks Repository

Directorio de hooks que promueven la lógica de conexión y transito de data.

Instalación:

```
npm i teloc-hooks
yarn add teloc-hooks
```
Importación:
```
import {
  useGetPayloadFromToken,
  useValidateToken,
  useFetchUserById,
} from "teloc-hooks";
```

Ejemplos de uso:
```
  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();
  const {user, loading, error} = useFetchUserById(id: string); //informar de un identificador
  const {processData} = useDataProfileProcessor(); //post data
```




## useValidateToken

Este hook, llamado **useValidateToken**, se utiliza para validar un token de autenticación almacenado en las cookies de un cliente en una aplicación React. Su objetivo principal es verificar si el token es válido y si coincide con el correo electrónico almacenado en las cookies. 

Aquí hay un resumen de lo que hace:

**Estado Inicial:** Inicializa un estado **isValid** con el valor false, que indica si el token es válido.

**Obtención de Clave Secreta:** Utiliza una clave secreta (secretKey) para verificar la autenticidad del token. 

**Efecto:** Utiliza el hook **useEffect** para ejecutar la lógica de validación cuando el componente se monta.

**Validación del Token:** En el interior de **useEffect**, se ejecuta una función llamada **validateToken**. 

Esta función realiza los siguientes pasos:

Captura el valor del correo electrónico almacenado en las cookies (storedEmail). Si no se encuentra, registra un error y devuelve false.

Obtiene el token de autenticación almacenado en las cookies (authToken). Si no se encuentra, registra un error y devuelve false.

Verifica la autenticidad del token utilizando la clave secreta (secretKey) y el algoritmo "HS256" a través de la librería **KJUR.jws.JWS**. Si el token no es válido, devuelve false.

Decodifica el token para extraer su contenido (payload). Si el token decodificado no contiene un payload válido, registra un error y devuelve false.

Compara el correo electrónico extraído del payload con el correo electrónico almacenado en las cookies. Si coinciden, devuelve true, lo que indica que el token es válido.

Si hay errores en cualquiera de los pasos anteriores, se registran en la consola y la función devuelve false.

**Actualización del Estado:** Finalmente, el estado isValid se actualiza con el resultado de la función validateToken.

**Retorno del Estado:** El hook devuelve el valor de isValid, que puede utilizarse en la lógica de renderizado de componentes para controlar el acceso basado en la validez del token.


## useGetPayloadFromToken

Este hook, llamado **useGetPayloadFromToken**, se utiliza para obtener y decodificar el payload de un token de autenticación almacenado en las cookies de un cliente en una aplicación React. 

Aquí tienes un resumen de lo que hace:

**Estado Inicial:** Inicializa un estado payload con el valor null, que contendrá el payload decodificado del token.

**Efecto:** Utiliza el hook useEffect para ejecutar la lógica de obtención del payload cuando el componente se monta.

**Obtención del Token:** Intenta obtener el token de autenticación almacenado en las cookies (authToken). Si no se encuentra, registra un error y establece payload en null.

**Decodificación del Token:** Utiliza la librería **KJUR.jws.JWS** para decodificar el token. Antes de asignar el resultado a payload, verifica que *decodedToken.payloadObj* exista y sea un objeto válido.

Si el token decodificado contiene un payload válido, se asigna a payload.

Si el token decodificado no contiene un payload válido, registra un error y establece payload en null.

**Manejo de Errores:** Maneja cualquier error que pueda ocurrir durante la obtención y decodificación del token. Si se produce un error, lo registra en la consola y establece payload en null.

**Retorno del Payload:** El hook devuelve el valor de payload. Si payload es null, devuelve un objeto vacío. Esto permite utilizar el valor de payload de manera segura en la lógica de renderizado de componentes sin preocuparse por valores nulos.

En resumen, este hook te proporciona el payload decodificado del token de autenticación almacenado en las cookies. 

## useFetchUserById

Este hook, llamado **useFetchUserById**, está diseñado para realizar una solicitud HTTP para obtener información de un usuario a partir de su ID y gestionar el estado de la respuesta de manera efectiva. 

Aquí tienes un resumen de lo que hace:

**Estado Inicial:** Inicializa tres estados: user, loading, y error. Estos estados se utilizan para gestionar la respuesta de la solicitud HTTP.

**Efecto:** Utiliza el hook useEffect para ejecutar la lógica de obtención de usuario cuando el componente se monta o cuando cambia el ID proporcionado.

**Obtención del Usuario:** Dentro de la función fetchUser, se realiza una solicitud HTTP GET utilizando la librería Axios para obtener información de un usuario específico mediante su ID.

**Gestión de la Respuesta:**

Si la solicitud es exitosa, se asigna el usuario obtenido (response.data) al estado user, y se establece error en null.

Si se produce un error durante la solicitud, se maneja de manera adecuada. Se comprueba si err es una instancia de Error, y en ese caso, se utiliza err.message como mensaje de error. Si no es una instancia de Error, se establece un mensaje de error genérico.

**Finalización de la Solicitud:** Independientemente de si la solicitud tiene éxito o falla, se establece loading en false para indicar que la solicitud ha finalizado.

**Condicional de Ejecución:** La lógica de solicitud se ejecuta solo si id es proporcionado y tiene un valor. Esto permite controlar cuándo se debe buscar un usuario en función de la presencia y cambios en el ID.

**Retorno de Resultados:** El hook devuelve un objeto que contiene el usuario (user), un indicador de carga (loading), y un mensaje de error (error). Esto permite al componente consumidor saber si la solicitud está en curso, si se ha completado con éxito y si se ha producido algún error.

En resumen, este hook simplifica la gestión de solicitudes HTTP para obtener información de un usuario por su ID en una aplicación React y proporciona una forma conveniente de gestionar el estado de la respuesta de manera efectiva. Puede ser utilizado en componentes para obtener y mostrar información del usuario de manera fácil y controlada.

## useDataProfileProcessor

Este hook, llamado **useDataProfileProcessor**, se encarga de procesar y enviar datos actualizados del perfil de usuario a través del servicio `userService`. 

Aquí tienes un resumen de lo que hace:

1. **Función de Procesamiento de Datos**: El hook exporta una función llamada `processData`, que acepta un objeto `validatedData` como argumento. Este objeto contiene información sobre el usuario que se actualizará, como el nombre, apellido, dirección, etc.

2. **Preparación de Datos**: Dentro de la función `processData`, se preparan los datos del usuario que se enviarán al servicio `userService`. Se crea un objeto `updatedUser` con los campos necesarios para la actualización. En este caso, se crea una estructura que incluye `firstName`, `lastName`, y `address` con subcampos como `street`, `postalCode`, `city`, `state`, y `country`. Esta estructura se utiliza para actualizar los datos del usuario.

3. **Envío de la Actualización**: La función intenta realizar la actualización del usuario utilizando el método `updateUser` del servicio `userService`. Este método toma el ID del usuario (`validatedData.identUser`) y los datos actualizados (`updatedUser`) como argumentos.

4. **Gestión de Errores**: Si la actualización tiene éxito, la función devuelve `true` para indicar que la operación se completó con éxito. Si se produce un error durante la actualización, se lanza una excepción para propagar el error hacia arriba. Esto permite a los componentes que utilizan este hook manejar los errores de manera adecuada.

5. **Registros en Consola**: Se incluye un registro en la consola para mostrar los datos validados antes de enviar la actualización.

En resumen, este hook proporciona una manera conveniente de procesar y enviar datos actualizados del perfil de usuario a través del servicio `userService`. Puede ser utilizado en componentes para gestionar la lógica de actualización de perfiles de usuario de manera más sencilla y reutilizable.

### Directorios anexos

## services/userService.ts

Este módulo **userService** se encarga de interactuar con un servicio RESTful para realizar operaciones relacionadas con los usuarios, como obtener, actualizar y eliminar usuarios. 

A continuación, un resumen de las funciones exportadas y su funcionalidad:

1. **`getUserById(id: any)`:** Esta función recibe un `id` como argumento y realiza una solicitud GET al servidor en la URL `BASE_URL` para obtener los detalles del usuario con el ID proporcionado. Si la solicitud es exitosa, devuelve los datos del usuario. Si ocurre algún error durante la solicitud, lanza una excepción con el mensaje "Error al obtener el usuario."

2. **`updateUser(id: string, user: { ... })`:** La función `updateUser` se utiliza para actualizar la información de un usuario existente. Toma dos argumentos: el `id` del usuario que se actualizará y un objeto `user` que contiene los datos actualizados del usuario, incluyendo `firstName`, `lastName`, y `address` con campos como `street`, `postalCode`, `city`, `state`, y `country`. La función realiza una solicitud PUT al servidor con los datos proporcionados y devuelve los datos actualizados del usuario en caso de éxito. Si ocurre un error, lanza una excepción con el mensaje "Error al actualizar el usuario."

3. **`deleteUser(id: any)`:** Esta función se utiliza para eliminar un usuario por su `id`. Realiza una solicitud DELETE al servidor para eliminar al usuario con el ID proporcionado. Si la eliminación se lleva a cabo con éxito, devuelve los datos del usuario eliminado. En caso de error, lanza una excepción con el mensaje "Error al eliminar el usuario."

Cada una de estas funciones maneja las solicitudes HTTP y los errores correspondientes de manera encapsulada, lo que facilita la interacción con el servicio de usuarios en una aplicación React.