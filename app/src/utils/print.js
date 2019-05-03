export default function(data, form){
    const datas = data.map((item) => ({
        ...item,
        time: item.time.format('MM-DD HH:mm dd')
    }));
    const info = {
        phone: form.phone,
        time: form.time.format('YYYY-MM-DD')
    }
    window.electron.ipcRenderer.send('print', {
        datas,
        info
    });
}