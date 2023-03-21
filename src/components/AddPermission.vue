<template>
  <div class="card m-3">
    <h5 class="card-header">Formulario de permiso</h5>
    <div class="card-body">
      <Form @submit="savePermission" :validation-schema="schemaValidation" v-slot="{ errors }">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label>Nombre</label>
            <Field name="firstName" type="text" v-model="permission.nombreEmpleado" class="form-control"
              :class="{ 'is-invalid': errors.firstName }" />
            <div class="invalid-feedback">{{ errors.firstName }}</div>
          </div>
          <div class="form-group col-md-12">
            <label>Apellido</label>
            <Field name="lastName" type="text" v-model="permission.apellidosEmpleado" class="form-control"
              :class="{ 'is-invalid': errors.lastName }" />
            <div class="invalid-feedback">{{ errors.lastName }}</div>
          </div>
          <div class="form-group col-md-12">
            <label>Tipo permiso</label>
            <Field name="permissionType" v-model="permission.tipoPermiso" as="select" class="form-control"
              :class="{ 'is-invalid': errors.permissionType }">
              <option v-for="item in permissionTyPelist" :key="item.id" :value="item.id">
                {{ item.descripcion }}
              </option>
            </Field>
            <div class="invalid-feedback">{{ errors.permissionType }}</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label>Fecha de solicitud</label>
            <Field name="applicationDate" type="date" v-model="permission.fechaPermiso" class="form-control"
              :class="{ 'is-invalid': errors.applicationDate }" />
            <div class="invalid-feedback">{{ errors.applicationDate }}</div>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary mr-1">Guardar</button>
          <button @click="cleanfields()" class="btn btn-secondary">Reiniciar</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>

import DataService from '../services/DataService';
import Swal from 'sweetalert2'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import moment from "moment";
export default {
  name: "add-permission",
  components: {
    Form,
    Field,
  },
  data() {
    const schemaValidation = Yup.object().shape({
      firstName: Yup.string()
        .required('Debe digital un nombre'),
      lastName: Yup.string()
        .required('Debe digital un apellido'),
      permissionType: Yup.string()
        .required('Debe seleccionar un tipo de permiso'),
      applicationDate: Yup.string()
        .required('Debe seleccionar una fecha de solicitud')
    });
    return {
      permission: {
        id: 0,
        nombreEmpleado: "",
        apellidosEmpleado: "",
        tipoPermiso: "",
        fechaPermiso: ""
      },
      schemaValidation,
      permissionTyPelist: [],
      succeeded: false,
      isActive: true,
    };
  },
  methods: {
    getPermissionTyPelist() {
      DataService.getAll("/PermissionType")
        .then(response => {
          let data = response['data'];
          this.permissionTyPelist = data['data'];
          this.permissionTyPelist.unshift({ id: "", descripcion: 'Seleccione un permiso' })
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPermissionById(id) {
      DataService.getById(id)
        .then(response => {
          console.log(response.data);
          this.permission.id = response.data.id;
          this.permission.nombreEmpleado = response.data.nombreEmpleado;
          this.permission.apellidosEmpleado = response.data.apellidosEmpleado;
          this.permission.tipoPermiso = response.data.tipoPermiso;
          this.permission.fechaPermiso = this.getDateFormat(response.data.fechaPermiso);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePermission() {
      DataService.update(this.permission.id, this.permission)
        .then(response => {
          console.log(response.data.data.id)
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: "Permiso fue actualizado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push('/permissions');
        })
        .catch(e => {
          console.log(e);
        });
    },
    savePermission() {
      if (this.isActive) {
        DataService.create(this.permission)
          .then(response => {
            this.succeeded = response.data.succeeded;
            if (this.succeeded) {
              Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: "Permiso fue guardado con éxito",
                showConfirmButton: false,
                timer: 1500
              });
              this.$router.push('/permissions');
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.updatePermission();
      }
    },
    cleanfields() {
      this.permission.id = 0,
        this.permission.nombreEmpleado = "";
      this.permission.apellidosEmpleado = "";
      this.permission.tipoPermiso = "";
      this.permission.fechaPermiso = "";
      this.isActive = true;
    },
    getDateFormat(Data) {
      return moment(Data).format('YYYY-MM-DD');
    }
  },
  mounted() {
    this.getPermissionTyPelist();
    let id = this.$route.params.id;
    if (id !== "0") {
      this.getPermissionById(id);
      this.isActive = false;
    }
  }
};
</script>
  
<style></style>