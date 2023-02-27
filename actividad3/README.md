# Explicacion de la resolucion del bug

En una aplicación React, normalmente se utiliza un router para manejar la navegación y mostrar diferentes componentes según la URL. Sin embargo, cuando la aplicación se ejecuta en un servidor, la configuración del servidor debe indicar cómo manejar las solicitudes de URL. En particular, debe indicar cómo manejar solicitudes de rutas que no corresponden a archivos físicos en el servidor.
``` bash
    {
        try_files $uri $uri/ /index.html;
    }
```
El fragmento de configuración location en el archivo default.conf de Nginx indica que todas las solicitudes deben ser manejadas por index.html en la raíz de la aplicación. Este es un patrón común para aplicaciones React que utilizan routers, ya que el archivo index.html cargará el script de la aplicación y el router se encargará del enrutamiento en el lado del cliente.

``` Dockerfile
    COPY default.conf /etc/nginx/conf.d/default.conf 
```

Entonces se ha copiado y creado el archivo default.conf al contenedor Docker para que Nginx sepa cómo manejar las solicitudes de URL.

 Si el archivo no está presente, Nginx no tendrá ninguna configuración por defecto para manejar las solicitudes y podría resultar en errores al intentar acceder a las rutas de la aplicación React. Además, si se necesita modificar la configuración de Nginx en el futuro, se puede modificar el archivo default.conf en la imagen Docker y volver a construir la imagen en lugar de tener que modificar la configuración de Nginx en cada contenedor individual.