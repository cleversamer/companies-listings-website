// Signup Validaiton
export function validateSignupForm(formData) {
  const errors = [];
  const phoneRgx = /^(\+)?\d{10,}$/;

  if (!formData.user_name) {
    errors.push("user_name cannot be empty");
  }

  if (!formData.whats_app) {
    errors.push("whats_app cannot be empty");
  } else if (!phoneRgx.test(formData.whats_app)) {
    errors.push("Invalid WhatsApp number format");
  }

  if (!formData.company_name) {
    errors.push("company_name cannot be empty");
  }

  if (!formData.password) {
    errors.push("password cannot be empty");
  }

  return errors[0];
}

// Signin Validaiton
export function validateSigninForm(formData) {
  const errors = [];
  if (!formData.whats_app) {
    errors.push("whats_app cannot be empty");
  }

  if (!formData.password) {
    errors.push("password cannot be empty");
  }

  return errors[0];
}

// verify code Validaiton
export function validateVerifyCodeForm(formData) {
  const errors = [];
  if (!formData.code) {
    errors.push("code cannot be empty");
  }

  return errors[0];
}

export function validateCountriesForm(formData) {
  const errors = [];
  if (formData.length < 1) {
    errors.push("Countries cannot be empty");
  }

  return errors[0];
}

export function validateforgetPasswordForm(formData) {
  const errors = [];
  const phoneRgx = /^(\+)?\d{10,}$/;
  if (!formData.whats_app) {
    errors.push("whats_app cannot be empty");
  } else if (!phoneRgx.test(formData.whats_app)) {
    errors.push("Invalid WhatsApp number format");
  }

  return errors[0];
}

export function validateResetPasswordForm(formData) {
  const errors = [];
  const phoneRgx = /^(\+)?\d{10,}$/;

  if (!formData.whats_app) {
    errors.push("whats_app cannot be empty");
  } else if (!phoneRgx.test(formData.whats_app)) {
    errors.push("Invalid WhatsApp number format");
  }

  if (!formData.code) {
    errors.push("code cannot be empty");
  }

  if (!formData.password) {
    errors.push("password cannot be empty");
  }

  if (!formData.confirm_password) {
    errors.push("confirm_password cannot be empty");
  } else if (formData.password !== formData.confirm_password) {
    errors.push("Password not match");
  }

  return errors[0];
}

export function validateUserForm(formData, edit) {
  const errors = [];
  const phoneRgx = /^(\+)?\d{10,}$/;

  if (!formData.user_name) {
    errors.push("user_name cannot be empty");
  }

  if (!formData.whats_app) {
    errors.push("whats_app cannot be empty");
  } else if (!phoneRgx.test(formData.whats_app)) {
    errors.push("Invalid WhatsApp number format");
  }

  if (!formData.company_name) {
    errors.push("company_name cannot be empty");
  }

  if (formData.countries.length < 1) {
    errors.push("countries cannot be empty");
  }

  if (!formData.password && !edit) {
    errors.push("password cannot be empty");
  }

  return errors[0];
}

export function validateCountryForm(formData) {
  const errors = [];
  if (!formData.name) {
    errors.push("name cannot be empty");
  }

  return errors[0];
}

export function validateUpdatePasswordForm(formData) {
  const errors = [];
  if (!formData.password) {
    errors.push("old Password cannot be empty");
  }

  if (!formData.new_password) {
    errors.push("new_password cannot be empty");
  }

  if (!formData.confirm_password) {
    errors.push("confirm_password cannot be empty");
  } else if (formData.new_password !== formData.confirm_password) {
    errors.push("password dose not match");
  }

  return errors[0];
}

export function validateRecordForm(formData, edit) {
  const errors = [];
  const fields = [
    "rgn",
    "owner",
    "comp",
    "phas",
    "type",
    "bs",
    "fg",
    "bua_from",
    "bua_to",
    "ga_from",
    "ga_to",
    "ra_from",
    "ra_to",
    "utp_from",
    "utp_to",
    "dp_from",
    "dp_to",
    "ys_from",
    "ys_to",
    "dly_from",
    "dly_to",
  ];

  fields.forEach((field) => {
    if (formData[field].length < 1) {
      errors.push(`${field} cannot be empty`);
    }
  });

  return errors[0];
}

export function validateFiles(files, fileType) {
  const errors = [];

  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const pdfType = "application/pdf";

  if (fileType === "excel") {
    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        errors.push("Please select an Excel file.");
      }
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type !== pdfType) {
        errors.push("Please select an PDF file.");
      }
    }
  }

  return errors[0];
}

export function validateTypeForm(formData) {
  const errors = [];
  if (!formData.name) {
    errors.push("name cannot be empty");
  }

  return errors[0];
}
