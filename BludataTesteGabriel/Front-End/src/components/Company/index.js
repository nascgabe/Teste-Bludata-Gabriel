import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Api from "../../Services/Api";
import SendIcon from "@material-ui/icons/Send";
import Botao from "../Buttons/envioformulario";
import Lista from "../Listas/company";
import CustomDialog from "../Alerts/dialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 8,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    minHeight: 360,
    minWidth: 360,
    textAlign: "center",
    marginTop: "3%"
  },

  control: {
    padding: theme.spacing(1)
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 251
  },

  dense: {
    marginTop: theme.spacing(2)
  },

  menu: {
    width: 200
  }
}));

const uf = [
  {
    value: 1,
    label: "Acre"
  },
  {
    value: 2,
    label: "Amapá"
  },
  {
    value: 3,
    label: "Amazonas"
  }
];

export default function SpacingGrid() {
  document.title = "Cadastro de Empresas";
  const classes = useStyles();
  const [hasReturnedSuccess, setHasReturnedSuccess] = useState(false);
  const [hasReturnedSuccessMessage, setHasReturnedSuccessMessage] = useState(
    ""
  );
  const [hasReturnedError, setHasReturnedError] = useState(false);
  const [hasReturnedErrorMessage, setHasReturnedErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setHasReturnedError(false);
  };
  const handleCloseSuccessModal = () => {
    setHasReturnedSuccess(false);
  };

  const CreateCompany = async () => {
    try {
      return Api.post(
        "https://localhost:44375/v1/company",
        values
      ).then(res => {
        setHasReturnedSuccessMessage(res.data.message);
        setHasReturnedSuccess(true);
      });
    } catch (error) {
      setHasReturnedErrorMessage(error.response.data.message);
      setHasReturnedError(true);
    }
  };

  const [values, setValues] = useState({
    name: "",
    uf: 1,
    cnpj:""
  });
  const [erros] = useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const showErrorText = name => {
    let errorText = erros[name];
    if (errorText) return errorText[0];
  };

  return (
    <Container maxWidth="lg">
      {hasReturnedError && (
        <CustomDialog
          open={"Oi"}
          // onExited={() => {}}
          title={"Algo deu errado! Verifique as informações!"}
          //confirmLabel={handleCloseErrorModal}
          onConfirm={handleCloseErrorModal}
          onCancel={handleCloseErrorModal}
        >
          {hasReturnedErrorMessage}
        </CustomDialog>
      )}
      {hasReturnedSuccess && (
        <CustomDialog
          open={"Oi"}
          
          title={"Cadastro de Empresa realizado com sucesso!"}

          onConfirm={handleCloseSuccessModal}
          onCancel={handleCloseSuccessModal}
        >
          {hasReturnedSuccessMessage}
        </CustomDialog>
      )}

      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.root}>
          <Paper className={classes.paper} style={{ flex: 1 }}>
            <div>
            <TextField
                id="name"
                label="Nome"
                error={erros.name !== undefined}
                className={classes.textField}
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("name")}
                style={{ width: "70%" }}
              />
            </div>
            <div>
            <TextField
                id="uf"
                select
                label="UF"
                error={erros.uf !== undefined}
                className={classes.textField}
                value={values.uf}
                onChange={handleChange("uf")}
                helperText={showErrorText("uf")}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
                style={{ width: "70%" }}
              >
                {uf.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
            <TextField
                id="cnpj"
                label="CNPJ"
                error={erros.cnpj !== undefined}
                className={classes.textField}
                value={values.cnpj}
                onChange={handleChange("cnpj")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("cnpj")}
                style={{ width: "70%" }}
              />
            </div>
            <Botao
              onClick={() => CreateCompany()}
              label="Cadastrar"
              sendIcon={<SendIcon style={{ marginLeft: "10px" }}></SendIcon>}
            ></Botao>
          </Paper>
          <div style={{ flex: 2 }} className={classes.paper}>
            <Lista />
          </div>
        </div>
      </form>
    </Container>
  );
}
