<template>
    <div class="col-sm-12">
        <div class="pull-left">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li>
                        showing {{pagination.from}} to {{pagination.to}} of {{pagination.total}}
                    </li>
                </ul>
            </nav>
        </div>
        <div class="pull-right">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('first_page_url')"
                                :disabled="pagination.first_page_url==null">First
                        </button>
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('prev_page_url')"
                                :disabled="pagination.prev_page_url==null">Prev
                        </button>
                    </li>
                    <li class="page-item">
                        Page {{pagination.current_page}} of {{pagination.last_page}}
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('next_page_url')"
                                :disabled="pagination.next_page_url==null"
                        >Next
                        </button>
                    </li>
                    <li class="page-item">
                        <button class="btn btn-default" v-on:click="changePage('last_page_url')"
                                :disabled="pagination.last_page_url==null"
                        >Last
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