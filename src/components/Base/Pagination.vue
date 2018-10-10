<template>
    <div class="col-sm-12">
        <div class="pull-left">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li>
                        Menampilkan {{pagination.from}} ke {{pagination.to}} dari {{pagination.total}}
                    </li>
                </ul>
            </nav>
        </div>
        <div class="pull-right">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('first_page_url')"
                                :disabled="(pagination.first_page_url == null || pagination.current_page == 1)"><span class="el-icon-d-arrow-left"></span>
                        </button>
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('prev_page_url')"
                                :disabled="(pagination.prev_page_url == null)">Sebelumnya
                        </button>
                    </li>
                    <li class="page-item">
                        Halaman {{pagination.current_page}} dari {{pagination.last_page}}
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('next_page_url')"
                                :disabled="(pagination.next_page_url == null)"
                        >Selanjutnya
                        </button>
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('last_page_url')"
                                :disabled="(pagination.last_page_url == null || pagination.current_page == pagination.last_page)"
                        ><span class="el-icon-d-arrow-right"></span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
//        pagination: {
//          first_page_url: null,
//          prev_page_url: null,
//          next_page_url: null,
//          last_page_url: null,
//        }
      }
    },
    props: ['pagination'],
    methods: {
      changePage(val) {
        this.$emit('paginate', val);
      },
    }
  }
</script>