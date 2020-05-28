<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th width=80>
                        コード
                    </th>
                    <th>
                        銘柄
                    </th>
                    <th width=100>
                        上場日
                    </th>
                    <th>
                        会社情報
                    </th>
                    <th width=120>
                        詳細
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr :key="content.cd" v-for="content in contents">
                    <td>
                        <router-link :to="`/${content.cd}`">{{ content.cd }}</router-link>
                    </td>
                    <td>
                        <small>{{ content.name }}</small>
                    </td>
                    <td>
                        <small>{{ content.listing }}</small>
                    </td>
                    <td>
                        <small v-if="content.info">{{ content.info }}</small>
                        <small v-else>No Data</small>
                    </td>
                    <td>
                        <div>
                            <a :href="content.hp"><small>公式サイト</small></a>
                        </div>
                        <div>
                            <a :href="content.yahoo" v-if="content.yahoo"><small>yahoo finance</small></a>
                            <h6 v-else>-</h6>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Axios from 'axios'
import contents from '@/data/contents.json';
export default {
    name: 'Contents',
    mounted: {
        contents
    },
    props: {
        dateInfo: String
    },
    data() {
        return {
            contents
        }
    }
}
</script>