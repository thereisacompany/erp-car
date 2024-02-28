<script>
export default {
    props: {
        title: { type: String, default: '', },
        msg: { type: String, default: '', },
        leftbtn: { type: String, default: '關閉', },
        rightbtn: { type: String, default: '確認', },
        leftfunc: { type: Function },
        rightfunc: { type: Function },
    },
    computed: {
        msgList: function () {
            return String(this.msg).split('\n');
        }
    },
    methods: {
        clickLeft() {
            if (this.leftfunc) this.leftfunc();
        },
        clickRight() {
            if (this.rightfunc) this.rightfunc();
        },
    },
}
</script>

<template>
    <div class="modal fade" id="modalhome1">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="heading">
                    <h4 class="fw_6 text-center">
                        {{ title }}
                    </h4>
                    <p v-for="(m1, midx) in msgList" :key="'msglist' + midx">{{ m1 }}</p>
                </div>
                <div class="bottom">
                    <a href="javascript:;" class="secondary_color btn-hide-modal" aria-label="Close" @click="clickLeft">{{
                        leftbtn }}</a>
                    <a href="javascript:;" class="primary_color btn-hide-modal" aria-label="Close" @click="clickRight">{{
                        rightbtn }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
