<template>
  <div class="card m-3">
    <h5 class="card-header">
      Listado de permisos
    </h5>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Tipo Permiso</th>
            <th scope="col">Fecha de solicitud</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(permission, index) in permissions.data" :key="index">
            <th scope="row">{{ permission.id }}</th>
            <td>{{ permission.nombreEmpleado }}</td>
            <td>{{ permission.apellidosEmpleado }}</td>
            <td>{{ permission.permisoDescripcion }}</td>
            <td>{{ getDateFormat(permission.fechaPermiso) }}</td>
            <td>
              <router-link :to="{ name: 'add-permission', params: { id: permission.id } }" custom
                v-slot="{ navigate }"><button @click="navigate" class="btn btn-warning" role="link">Editar</button>
              </router-link> |
              <button type="button" @click="deletePermission(permission.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import Swal from 'sweetalert2'
import moment from "moment";

export default {
  name: "permissions",
  data() {
    return {
      permissions: [],
    };
  },
  methods: {
    getPermissionListing() {
      DataService.getAll("/Permission")
        .then(response => {
          this.permissions = response.data;
          console.log(this.permissions.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletePermission(id) {
      Swal.fire({
        title: '¿Está seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          DataService.delete(id)
            .then(response => {
              console.log(response.data);
              this.getPermissionListing();
              Swal.fire(
                '¡Eliminado!!',
                'El permiso ha sido eliminado.',
                'success'
              )
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    },
    getDateFormat(Data) {
      return moment(Data).format('DD-MM-YYYY');
    }
  },
  mounted() {
    this.getPermissionListing();
  }
};
</script>

<style></style>