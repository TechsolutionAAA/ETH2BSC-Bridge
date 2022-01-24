import axios from 'axios';
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, cssTransition } from "react-toastify";

const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
});

export const ethToBscRequest = async (account, value, signature, hash) => {
    toast.loading("Wait please.\nServer is processing your request.", {
        transition: bounce
    });
    const postdata = {
        account: account,
        amount: value,
        signature: signature,
        hash: hash
    };
    await axios
        .post(`/api/bridge/eth2bsc`, postdata)
        .then(e => {
            console.log(e);
            toast.dismiss();
            toast.success(e.data, {
                transition: bounce
            })
        })
        .catch(err => {
            toast.dismiss()
            var error = err.response.data;
            if (error.step) {
                toast.error(error.message, {
                    transition: bounce,
                    delay: 8
                })
                return;
            }
            toast.error("Server is not working. \n Check your network connection.", {
                transition: bounce
            })
            console.log(err)
        });
}

export const bscToEthRequest = async (account, value, signature, hash) => {
    toast.loading("Wait please.\nServer is processing your request.", {
        transition: bounce
    });

    const postdata = {
        account: account,
        amount: value,
        signature: signature,
        hash: hash
    };

    await axios
        .post(`/api/bridge/bsc2eth`, postdata)
        .then(e => {
            console.log(e);
            toast.dismiss();
            toast.success(e.data, {
                transition: bounce,
                delay: 8
            })
        })
        .catch(err => {
            toast.dismiss()
            var error = err.response.data;
            if (error.step) {
                toast.error(error.message, {
                    transition: bounce
                })
                return;
            }
            toast.error("Server is not working. \n Check your network connection.", {
                transition: bounce
            })
            console.log(err);
        });
}